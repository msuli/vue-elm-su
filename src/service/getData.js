import fetch from '../config/fetch';

//获取定位城市
export const cityGuess =
  () =>
    fetch('/v1/cities', {
      type: 'guess'
    });

export const hotCities = () =>
  fetch('/v1/cities', {
    type: 'hot'
  });

export const cityGroup = () =>
  fetch('/v1/cities', {
    type: 'group'
  });
