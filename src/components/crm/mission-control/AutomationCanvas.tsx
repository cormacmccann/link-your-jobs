import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Mail, Plus, Webhook, Bell, FileEdit } from 'lucide-react';

const TriggerNode = ({ data }: any) => (
  <Card className="px-4 py-3 min-w-[180px] border-2 border-primary bg-primary/5">
    <div className="flex items-center gap-2 mb-1">
      <Zap className="h-4 w-4 text-primary" />
      <div className="font-bold text-sm">Trigger</div>
    </div>
    <div className="text-xs mt-1">{data.label}</div>
  </Card>
);

const ActionNode = ({ data }: any) => {
  const getIcon = () => {
    switch (data.actionType) {
      case 'send_email': return <Mail className="h-4 w-4 text-green-600" />;
      case 'webhook': return <Webhook className="h-4 w-4 text-green-600" />;
      case 'create_card': return <FileEdit className="h-4 w-4 text-green-600" />;
      case 'send_notification': return <Bell className="h-4 w-4 text-green-600" />;
      default: return <Plus className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <Card className="px-4 py-3 min-w-[180px] border-2 border-green-500 bg-green-50">
      <div className="flex items-center gap-2 mb-1">
        {getIcon()}
        <div className="font-bold text-sm">Action</div>
      </div>
      <div className="text-xs mt-1">{data.label}</div>
    </Card>
  );
};

const ConditionNode = ({ data }: any) => (
  <Card className="px-4 py-3 min-w-[180px] border-2 border-yellow-500 bg-yellow-50">
    <div className="flex items-center gap-2 mb-1">
      <div className="font-bold text-sm">Condition</div>
    </div>
    <div className="text-xs mt-1">{data.label}</div>
  </Card>
);

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

const defaultNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'Card Created' },
  },
];

const defaultEdges: Edge[] = [];

export function AutomationCanvas({ workflow, onSave }: any) {
  const [nodes, setNodes, onNodesChange] = useNodesState(workflow?.nodes || defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflow?.edges || defaultEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addActionNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'action',
      position: { x: 250, y: 150 + (nodes.length * 100) },
      data: { 
        label: 'Send Email',
        actionType: 'send_email'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addConditionNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'condition',
      position: { x: 250, y: 150 + (nodes.length * 100) },
      data: { label: 'If status = "completed"' },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleSave = () => {
    onSave({ nodes, edges });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={addActionNode} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Action
        </Button>
        <Button onClick={addConditionNode} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Condition
        </Button>
        <Button onClick={handleSave} size="sm" className="ml-auto">
          Save Workflow
        </Button>
      </div>

      <div className="h-[500px] border rounded-lg bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>• Drag to pan • Scroll to zoom • Click nodes to configure • Connect nodes to build workflow</p>
      </div>
    </div>
  );
}
