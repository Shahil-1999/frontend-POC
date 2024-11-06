import { deleteUserAccount } from "../api/apis";
export const deleteAccount = async (navigate) => {

    const userDetailsId = localStorage.getItem("userDetailsId")
    const token = localStorage.getItem("token")
        try {
            const res = await deleteUserAccount(token, userDetailsId)
            if (res?.data?.status) {
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

