import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loading } from "./loading";
import { useFormContext } from "react-hook-form";
import { accountsStore } from "@/store/accounts-store";
import { SchemaType } from "@/pages";
export function TransferForm() {
  const { accountsData, transfer } = accountsStore((state) => ({
    accountsData: state.accounts,
    transfer: state.transfer,
  }));

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<SchemaType>();
  function handleChangeTransferAccount(
    property: "fromAccount" | "toAccount",
    value: string
  ) {
    setValue(property, value);
  }

  const fromAccountId = watch("fromAccount");
  const toAccountId = watch("toAccount");

  const onSubmit = handleSubmit(async (data) => {
    if (fromAccountId === "checking") {
      await transfer({
        amount: data.amount,
        fromAccount: accountsData.checking,
        toAccount: accountsData.saving,
      });
    } else {
      await transfer({
        amount: data.amount,
        fromAccount: accountsData.saving,
        toAccount: accountsData.checking,
      });
    }
  });

  return (
    <Card className="p-4 md:p-8">
      <CardHeader>
        <CardTitle>Transfer funds</CardTitle>
        <CardDescription>Move money between your accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>
                <span>From</span>
                <Select
                  onValueChange={(value) =>
                    handleChangeTransferAccount("fromAccount", value)
                  }
                >
                  <SelectTrigger
                    data-error={!!errors.fromAccount}
                    className="w-[180px]"
                  >
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="saving">Saving</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>
            <div>
              <Label>
                <span>To</span>
                <Select
                  onValueChange={(value) =>
                    handleChangeTransferAccount("toAccount", value)
                  }
                >
                  <SelectTrigger
                    data-error={!!errors.toAccount}
                    className="w-[180px]"
                  >
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="saving">Saving</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>
            <div>
              <Label>
                <span>Amount</span>
                <Input
                  className="mt-1 form-input"
                  placeholder="0.00"
                  type="number"
                  data-error={!!errors.amount}
                  {...register("amount")}
                />

                <span className="text-red-400 text-xs opacity-70">
                  {errors.amount?.message}
                </span>
              </Label>
            </div>
          </div>
          <Button type="submit" className="mt-4">
            {isSubmitting ? <Loading /> : "Transfer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
