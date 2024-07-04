
export const deleteAccount = async (navigate) => {
    


    const userDetailsId = localStorage.getItem("userDetailsId")
    const token = localStorage.getItem("token")
    console.log("uuuuuuuuuuuu",userDetailsId);




        try {
            const response = await fetch(`http://localhost:5000/delete_user_acct/${userDetailsId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                
            })


            const res = await response.json();
            console.log("delete post commenttttttt", res?.data?.is_deleted);
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

