import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  proxyDisplay: string;
  warningText: string;
  onCancel: () => void;
  onContinue: () => void;
}

export function LoginRateLimitDialog({ open, proxyDisplay, warningText, onCancel, onContinue }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            IP Login Rate Limit Warning
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">{proxyDisplay}</span> {warningText}
          </div>
          <div className="text-xs">
            The limit is tracked separately for browser logins and API logins. Continue only if you accept the IP risk.
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onContinue}>Continue Anyway</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
