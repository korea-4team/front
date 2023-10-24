import './style.css';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from 'utils';
import { UserListResponseDto } from 'interfaces/response/admin';
import { ADMIN_USER_DETAIL_PATH } from 'constant';
interface Props {
  item: UserListResponseDto;
}

//          component          //
export default function AdminUserListItem({item}: Props) {

  //          state          //
  const { email, password, nickname, address, addressDetail, role, telNumber } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
    navigator(ADMIN_USER_DETAIL_PATH(email));
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-user-list-item-box" onClick={onClickHandler}>
      <div className="admin-user-list-box">
        <div className="admin-user-item-email">{email}</div>
        <div className="admin-user-item-password">**********</div>
        <div className="admin-user-item-nickname">{nickname}</div>
        <div className="admin-user-item-address">{address}</div>
        <div className="admin-user-item-address-detail">{addressDetail}</div>
        <div className="admin-user-item-telnumber">{telNumber}</div>
        <div className="admin-user-item-role">{role}</div>
      </div>
    </div>
  )
}
