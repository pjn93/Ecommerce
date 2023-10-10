import * as Yup from 'yup';

export const roleSchema = Yup.object().shape({
   role_id: Yup.string().min(2).max(25).required("Please enter User Id"),
   roleName: Yup.string().min(2).max(25).required("Please enter name"),
    })