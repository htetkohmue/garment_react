 import Moment from 'moment';

 export const ChangeDate = (props) => {
     if(props !== null){
         return Moment(props).format('YYYY-MM-DD');
     }
 }
 