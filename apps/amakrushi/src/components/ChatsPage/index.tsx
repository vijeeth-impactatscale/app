import styles from './index.module.css';
import React, { useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import ChatItem from '../chat-item';
import { MdMessage } from 'react-icons/md';
import { NextPage } from 'next';

//@ts-ignore
import { analytics } from '../../utils/firebase';
import { logEvent } from 'firebase/analytics';
import Menu from '../menu';
import { useLocalization } from '../../hooks';

const ChatsPage: NextPage = () => {
  useEffect(() => {
    //@ts-ignore
    logEvent(analytics, 'Chat_History_page');
  }, []);
  const t=useLocalization();
  
  return (
    <>
      <div className={styles.main}>
      <div className={styles.title}>{t("label.chats")}</div>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />{' '}
          </InputLeftElement>
          <Input type="text" placeholder="Search" />
        </InputGroup>
        <ChatItem image={<MdMessage />} name={'Session 1'} />
        <ChatItem image={<MdMessage />} name={'Session 2'} />
        <ChatItem image={<MdMessage />} name={'Session 3'} />
      </div>
      <Menu />
    </>
  );
};

export default ChatsPage;
