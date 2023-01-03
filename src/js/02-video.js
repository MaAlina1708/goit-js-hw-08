import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const timeUpd = function ({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(timeUpd, 1000));

const parsedTime = JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0;
player.setCurrentTime(parsedTime);
