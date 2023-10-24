import './style.css';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from 'utils';
import { UserListResponseDto } from 'interfaces/response/admin';
interface Props {
  item: UserListResponseDto;
}

//          component          //
export default function AdminShortReviewBoardListItem({item}: Props) {

  //          state          //
  const { email, password, nickname, address, addressDetail, role, telNumber } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-user-list-item-box" onClick={onClickHandler}>
      <div className="admin-user-board-list-box">
        <div className="admin-user-item-email">{email}</div>
        <div className="admin-user-item-password">{password}</div>
        <div className="admin-user-item-nickname">{nickname}</div>
        <div className="admin-user-item-address">{address}</div>
        <div className="admin-user-item-address-detail">{addressDetail}</div>
        <div className="admin-user-item-role">{role}</div>
        <div className="admin-user-item-telnumber">{telNumber}</div>
      </div>
    </div>
  )
}
