import { Fragment } from 'react';
import { IUser, IUserDataType } from 'types/user';

import DropdownAndMoreButton from 'components/DropdownAndMoreButton';
import Checkbox from 'components/UI/Checkbox';

export const mapUserToDataType = (user: IUser, index: number, onEdit: (user: IUser, key: string) => void, onDelete: (index: number) => void): IUserDataType => {
  const key = (index + 1).toString();

  return {
    key,
    name: user.name,
    memo: (
      <div style={{ minHeight: 48, display: 'flex', alignItems: 'center' }}>
        {user.memo.split('\n').map((line, i) => (
          <Fragment key={i}>
            {line}
            <br />
          </Fragment>
        ))}
      </div>
    ),
    joinDate: user.joinDate,
    job: user.job,
    isEmail: <Checkbox name={`isEmail-${index}`} checked={user.isEmail} readOnly />,
    more: <DropdownAndMoreButton onEdit={() => onEdit(user, key)} onDelete={() => onDelete(index)} index={index} />,
  };
};
