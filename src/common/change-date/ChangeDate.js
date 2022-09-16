/**
 *
 * @param props
 * @reutrn year month day (or) null
 * @author Nay Zaw Linn
 * @date 2021-05-03
 *
 */
import Moment from 'moment';

export const ChangeDate = (props) => {
    if(props !== null){
        return Moment(props).format('YYYY-MM-DD');
    }
   //    else{
    //     return null;
    // }
}
