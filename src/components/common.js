import { deleteUserAccount } from "../api/apis";
export const deleteAccount = async (navigate) => {
    


    const userDetailsId = localStorage.getItem("userDetailsId")
    const token = localStorage.getItem("token")
    // console.log("uuuuuuuuuuuu",userDetailsId);




        try {
            const res = await deleteUserAccount(token, userDetailsId)
            // console.log("delete post commenttttttt", res?.data?.is_deleted);
            if (res?.status) {
                navigate('/userLogin')
                localStorage.clear()

            }else{
                navigate('/')
            }


        } catch (error) {
            console.log(error);
        }

}
export  const showCommentsEditPage = (props) => {
    const {isCommentsUpdateBtnClicked, setIsCommentsUpdateBtnClicked, setEditCommentsData, commentsIndex, comment} = props
            
    if (isCommentsUpdateBtnClicked !== false) {
        setIsCommentsUpdateBtnClicked(false);
    } else {
        setIsCommentsUpdateBtnClicked(commentsIndex)
        
        setEditCommentsData(comment)
    }
    
}

