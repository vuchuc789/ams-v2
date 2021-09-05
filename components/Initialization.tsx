import { useEffect, useState } from 'react';
import styles from 'styles/Initialization.module.scss';
import type { AsyncAction, AsyncDispatch } from 'interfaces';
import { Spin } from 'antd';
import { loginWithFacebook } from 'actions';
import { useDispatch } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

const actionCreators: ((callback: () => void) => AsyncAction)[] = [
  (callback) => loginWithFacebook({ loginIfNotDone: false }, callback),
];

export const Initialization: React.FC<Props> = ({ children }) => {
  const [remainingActions, setRemainingActions] =
    useState<((callback: () => void) => AsyncAction)[]>(actionCreators);

  const dispatch = useDispatch<AsyncDispatch>();

  useEffect(() => {
    actionCreators.forEach((actionCreator) => {
      dispatch(
        actionCreator(() => {
          setRemainingActions((previousState) =>
            previousState.filter(
              (_actionCreator) => _actionCreator !== actionCreator,
            ),
          );
        }),
      );
    });
  }, [dispatch]);

  return (
    <>
      {!!remainingActions.length ? (
        <div className={styles.initContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
