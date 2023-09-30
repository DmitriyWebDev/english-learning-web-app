import { FC, ReactNode, useState } from 'react';
import { AppGrid as Grid } from '../../../../shared/ui';
import { dictionaryPreviewListStyles as styled } from './styles';

export type Props = {
  id: string;
  title: string;
  onClick: (id: string) => void;
  editButton: ReactNode;
  openButton: ReactNode;
  deleteButton: ReactNode;
};

export const DictionaryPreviewListItem: FC<Props> = ({
  id,
  title,
  onClick,
  editButton,
  openButton,
  deleteButton,
}: Props) => {
  const [isDeletingConfirmed, setIsDeletingConfirmed] = useState(false);

  return (
    <Grid xs={3} id={id}>
      <styled.Item>
        <div style={{ marginBottom: '10px' }} onClick={() => onClick(id)}>
          {title}
        </div>

        <div style={{ marginBottom: '10px' }}>{editButton}</div>

        <div style={{ marginBottom: '10px' }}>{openButton}</div>

        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            marginBottom: '10px',
          }}
        >
          {!isDeletingConfirmed && (
            <div
              onClick={() => {
                setIsDeletingConfirmed(true);
              }}
              style={{
                display: 'block',
                position: 'absolute',
                left: 0,
                top: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 2,
                width: '100%',
                height: '100%',
              }}
            />
          )}

          {deleteButton}
        </div>
      </styled.Item>
    </Grid>
  );
};
