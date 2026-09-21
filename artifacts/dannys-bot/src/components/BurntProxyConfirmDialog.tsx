import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  accountNames: string[];
  proxyDisplay?: string;
  onCancel: () => void;
  onContinue: () => void;
}

export function BurntProxyConfirmDialog({ open, accountNames, proxyDisplay, onCancel, onContinue }: Props) {
  const accountText = accountNames.length === 1
    ? `@${accountNames[0]}`
    : `${accountNames.length} selected accounts`;

  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) onCancel(); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <span aria-hidden="true">🔥</span>
            Burnt proxy warning
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>
                {accountText} {proxyDisplay ? `will be verified through ${proxyDisplay}` : "will be verified"} even though this IP is marked as burnt.
              </p>
              <p className="text-xs">
                Continuing may cause Instagram to challenge or restrict the account. Continue only if you accept this risk.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue} className="bg-orange-600 text-white hover:bg-orange-700">
            Continue with Verify
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}