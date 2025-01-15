import AccountHolderLayout from "../../components/AccountHolderLayout"
import TermDepositDetails from "../../components/TermDepositDetails"

const AdminTermDepositDetails = ()=>{
    return (
        <AccountHolderLayout  id={0}>
            <TermDepositDetails isAdmin/>
        </AccountHolderLayout>
    )
}
export default AdminTermDepositDetails