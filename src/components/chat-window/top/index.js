import { Icon } from '@rsuite/icons';
import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../../misc/custom-hooks';
import { TiArrowBack } from 'react-icons/ti';
import { ButtonToolbar } from 'rsuite';
import RoomInfoBtnModal from './RoomInfoBtnModal';

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);
  const isMobile = useMediaQuery('(max-width: 992px)');
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          <Link to="/">
            <Icon
              as={TiArrowBack}
              size="2em"
              className={
                isMobile
                  ? 'd-inline block p-0 mr-2 text-blue link-unstyled'
                  : 'd-none'
              }
            />
          </Link>
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">Todo</ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(ChatTop);
