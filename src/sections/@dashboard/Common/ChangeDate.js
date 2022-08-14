import moment from "moment";


 export const ChangeDate = (props) => {
     if(props !== null){
         return moment(props).format('YYYY-MM-DD');
     }
 }

 