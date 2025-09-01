import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import PremiumFeatureGuard from '@/components/subscription/PremiumFeatureGuard';
import { SideBarLayout } from '@/components/layout/sidebar-layout';
import type { FeatureCode, Goal, GoalProgress } from '@/types/api';
import { apiService } from '@/services/api';

export const Route = createFileRoute('/goals/' as any)({
  component: GoalsPage,
});

function GoalsPage() {
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [progress, setProgress] = useState<GoalProgress[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [g, p] = await Promise.all([
          apiService.getGoals(),
          apiService.getGoalProgress(),
        ]);
        setGoals(g);
        setProgress(p);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SideBarLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Goals</h1>
        <PremiumFeatureGuard feature={'advanced_finances' as FeatureCode}>
          <div className="p-0">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-3">
                {goals.map((g) => {
                  const pr = progress.find((x) => x.goalId === g._id);
                  return (
                    <div key={g._id} className="rounded border p-3">
                      <div className="font-medium">{g.name}</div>
                      <div className="text-sm">Target: ${g.targetAmount.toFixed(2)} • Current: ${g.currentAmount.toFixed(2)}</div>
                      {pr && (
                        <div className="text-sm text-muted-foreground">Progress: {pr.progressPercentage.toFixed(1)}%</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </PremiumFeatureGuard>
      </div>
    </SideBarLayout>
  );
}


