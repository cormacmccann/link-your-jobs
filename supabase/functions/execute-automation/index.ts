import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { trigger_type, trigger_data, organizationId } = await req.json();

    console.log('Executing automations for trigger:', trigger_type);

    const startTime = Date.now();

    // Find matching workflows
    const { data: workflows, error } = await supabase
      .from('automation_workflows')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('trigger_type', trigger_type)
      .eq('enabled', true);

    if (error) throw error;

    const results = [];

    for (const workflow of workflows || []) {
      try {
        // Check conditions
        const conditionsMet = evaluateConditions(workflow.conditions, trigger_data);

        if (!conditionsMet) {
          console.log('Conditions not met for workflow:', workflow.name);
          continue;
        }

        // Execute actions
        const actionsExecuted = [];
        for (const action of workflow.actions) {
          const result = await executeAction(action, trigger_data, supabase);
          actionsExecuted.push({ action: action.type, success: result.success });
        }

        // Log execution
        await supabase
          .from('automation_logs')
          .insert({
            workflow_id: workflow.id,
            trigger_data: trigger_data,
            status: 'success',
            actions_executed: actionsExecuted,
            execution_time_ms: Date.now() - startTime,
          });

        // Update run count
        await supabase
          .from('automation_workflows')
          .update({
            run_count: workflow.run_count + 1,
            last_run_at: new Date().toISOString(),
          })
          .eq('id', workflow.id);

        results.push({ workflow: workflow.name, status: 'success' });
      } catch (error: any) {
        console.error('Error executing workflow:', workflow.name, error);
        
        await supabase
          .from('automation_logs')
          .insert({
            workflow_id: workflow.id,
            trigger_data: trigger_data,
            status: 'failed',
            error_message: error.message,
            execution_time_ms: Date.now() - startTime,
          });

        results.push({ workflow: workflow.name, status: 'failed', error: error.message });
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in execute-automation:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function evaluateConditions(conditions: any[], data: any): boolean {
  if (!conditions || conditions.length === 0) return true;

  for (const condition of conditions) {
    const { field, operator, value } = condition;
    const fieldValue = getNestedValue(data, field);

    switch (operator) {
      case 'equals':
        if (fieldValue !== value) return false;
        break;
      case 'not_equals':
        if (fieldValue === value) return false;
        break;
      case 'contains':
        if (!String(fieldValue).includes(value)) return false;
        break;
      case 'greater_than':
        if (!(fieldValue > value)) return false;
        break;
      case 'less_than':
        if (!(fieldValue < value)) return false;
        break;
      default:
        console.log('Unknown operator:', operator);
    }
  }

  return true;
}

async function executeAction(action: any, triggerData: any, supabase: any): Promise<{ success: boolean }> {
  console.log('Executing action:', action.type);

  try {
    switch (action.type) {
      case 'send_email':
        await supabase.functions.invoke('send-support-reply', {
          body: {
            to: action.config.to,
            subject: replacePlaceholders(action.config.subject, triggerData),
            body: replacePlaceholders(action.config.body, triggerData),
          }
        });
        return { success: true };

      case 'create_card':
        await supabase
          .from('cards')
          .insert({
            organization_id: triggerData.organization_id,
            card_type: action.config.card_type,
            title: replacePlaceholders(action.config.title, triggerData),
            description: replacePlaceholders(action.config.description, triggerData),
            status: action.config.status || 'active',
            priority: action.config.priority || 'normal',
            created_by: triggerData.created_by || triggerData.user_id,
          });
        return { success: true };

      case 'update_card':
        await supabase
          .from('cards')
          .update(action.config.updates)
          .eq('id', triggerData.id);
        return { success: true };

      case 'assign_card':
        await supabase
          .from('cards')
          .update({ assigned_to: action.config.user_id })
          .eq('id', triggerData.id);
        return { success: true };

      case 'send_notification':
        // Future: integrate with notification system
        console.log('Notification sent:', action.config.message);
        return { success: true };

      case 'webhook':
        await fetch(action.config.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(triggerData),
        });
        return { success: true };

      default:
        console.log('Unknown action type:', action.type);
        return { success: false };
    }
  } catch (error) {
    console.error('Action execution failed:', error);
    return { success: false };
  }
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function replacePlaceholders(template: string, data: any): string {
  return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    return getNestedValue(data, path) || match;
  });
}
