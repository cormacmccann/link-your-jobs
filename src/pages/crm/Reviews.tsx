import { ReviewManager } from "@/components/reviews/ReviewManager";
import { TrustpilotReviews } from "@/components/reviews/TrustpilotReviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reviews() {
  const currentOrgId = localStorage.getItem("currentOrgId");

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Please select an organization first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">Manage and display Trustpilot reviews</p>
      </div>

      <Tabs defaultValue="display">
        <TabsList>
          <TabsTrigger value="display">Public Display</TabsTrigger>
          <TabsTrigger value="manage">Manage Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="display" className="space-y-6">
          <TrustpilotReviews organizationId={currentOrgId} />
        </TabsContent>

        <TabsContent value="manage">
          <ReviewManager organizationId={currentOrgId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}