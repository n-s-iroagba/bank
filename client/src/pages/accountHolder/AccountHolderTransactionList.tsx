import { useParams } from "react-router-dom"
import TransactionList from "../../components/ui/TransactionList"

export default function AccountHolderTransactionList (){
      const { accountId } = useParams<{ accountId: string }>()

    return <TransactionList checkingAccountId={Number(accountId)}/>
}