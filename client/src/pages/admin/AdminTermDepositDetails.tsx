import { useParams } from "react-router-dom"
import AccountHolderLayout from "../../components/AccountHolderLayout"
import TermDepositDetails from "../../components/TermDepositDetails"

const AdminTermDepositDetails = ()=>{
    const {id} = useParams<{id:string}>()

    return (
        <AccountHolderLayout accountHolderId={id as string}>
            <TermDepositDetails isAdmin/>
        </AccountHolderLayout>
    )
}
export default AdminTermDepositDetails