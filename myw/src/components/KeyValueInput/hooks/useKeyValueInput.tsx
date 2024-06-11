import { useState, useCallback, useMemo } from 'react';

const createEmptyValue = () => ({
  key: '',
  value: '',
  id: `${Math.round(Date.now() * Math.random())}`,
});

const objectToArray = (object: { [key: string]: any }) => {
  const arr = Object.keys(object).map((k) => ({
    key: k,
    value: object[k],
    id: `${Math.round(Date.now() * Math.random())}`,
  }));

  if (arr.length === 0) {
    return [createEmptyValue()];
  }

  return arr;
};

const arrayToObject = (array: { key: string; value: any; id: string }[]) => Object.fromEntries(
  array
    ?.filter((v) => v.key !== '' || v.value !== '')
    ?.map((v) => [v.key, v.value]),
);

const useKeyValueInput = (initialState: { [key: string]: any } | null) => {
  const defaultState = useMemo(
    () => (initialState ? objectToArray(initialState) : [createEmptyValue()]),
    [initialState],
  );

  const [state, setKeyValues] = useState(defaultState);

  const onChange = useCallback(
    (e: { target: { id: string; value: any; name: string } }) => {
      const id = e?.target?.id?.split('_').pop();
      const value = e?.target?.value;
      const key = e?.target?.name;

      setKeyValues(
        (
          prevState: {
            key: string;
            value: string;
            id: string;
            [key: string]: string;
          }[],
        ) => {
          const index = prevState.findIndex((item) => item?.id === id);
          const nextState = [...prevState];

          if (index === -1) {
            return [];
          }

          nextState[index][key] = value;

          /**
           * Append Row
           */
          const lastItem = prevState[prevState.length - 1];
          if (lastItem.key !== '' || lastItem.value !== '') {
            nextState.push(createEmptyValue());
          }

          return nextState;
        },
      );
    },
    [],
  );

  const onClear = useCallback((id: string) => {
    setKeyValues((prevState) => {
      const nextState = [...prevState];
      const index = prevState.findIndex((item) => item?.id === id);

      if (index === 0) {
        nextState[index].key = '';
        nextState[index].value = '';

        return nextState;
      }

      nextState.splice(index, 1);

      return nextState;
    });
  }, []);

  const keyValues = useMemo(() => arrayToObject(state), [state]);

  return [keyValues, { values: state, onChange, onClear }];
};

export default useKeyValueInput;
