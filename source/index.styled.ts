import styled from "styled-components";

const staticImage = `https://s2.music.126.net/style/web2/img/frame/playbar.png?d1dfc51fd30ea63831b89963a00ef004`;
const sliderImage = `https://s2.music.126.net/style/web2/img/frame/statbar.png?b9ea7630bac1c54faa4ae5ae30fb21b5`;
const iconImage = `https://s2.music.126.net/style/web2/img/iconall.png?066b1a7cd07d2ca9d13f4f506cc7f3e3`;

export const MusicPlayerContainer = styled.div`
  width: 980px;
  margin: 0px auto;
  zindex: 1;
  display: flex;
  align-items: center;
  height: 58px;
  min-width: 980px;
`;

export const MainBackground = styled.div`
  background: ${() => `url(${staticImage}) no-repeat 0 9999px`};
  background-position: 0px 0px;
  background-repeat: repeat-x;
  width: calc(100% - 67px);
  height: 100%;
  z-index: -1;
  position: absolute;
  bottom: 0px;
`;

export const ActiveArea = styled.div`
  position: absolute;
  width: 100%;
  height: 68px;
  bottom: 0px;
  cursor: pointer;
  z-index: -1;
`;

export const LockedIcon = styled.div`
  background: ${() => `url(${staticImage})`};
  background-position: -100px -400px;
  display: block;
  width: 18px;
  height: 18px;
  margin: 6px 0 0 17px;
  position: absolute;
  right: calc(50% - 9px);
  bottom: calc(50% + 10px);
`;

export const LeftContainer = styled.div`
  background: ${() => `url(${staticImage})`};
  position: absolute;
  top: -14px;
  right: 15px;
  width: 52px;
  height: 67px;
  background-position: 0 -380px;
  z-index: -1;
`;

export const RightBackground = styled.div`
  background: ${() => `url(${staticImage})`};
  position: absolute;
  top: -1px;
  right: 0;
  width: 15px;
  height: 53px;
  background-position: -52px -393px;
  pointer-events: none;
  z-index: -1;
`;

export const PlayIcon = styled.div<{ isPlayed: boolean }>`
  background: ${() => `url(${staticImage})`};
  width: 36px;
  height: 36px;
  background-position: ${({ isPlayed }) =>
    isPlayed ? "0px -165px;" : "0px -204px"};
  &:hover {
    background-position: ${({ isPlayed }) =>
      isPlayed ? "-40px -165px;" : "-40px -204px"};
  }
`;

export const ControlPanelContainer = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  /* justify-content: space-between; */
`;

export const PrevIcon = styled.div`
  background: ${() => `url(${staticImage})`};
  background-position: 0px -130px;
  width: 28px;
  height: 28px;
  margin-right: 8px;
  &:hover {
    background-position: -30px -130px;
  }
`;

export const NextIcon = styled.div`
  background: ${() => `url(${staticImage})`};
  background-position: -80px -130px;
  width: 28px;
  height: 28px;
  margin: 0px 8px;
  &:hover {
    background-position: -110px -130px;
  }
`;

export const SongImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin-left: 24px;
`;

export const WordArea = styled.div`
  height: 28px;
  overflow: hidden;
  color: #e8e8e8;
  text-shadow: 0 1px 0 #171717;
  line-height: 28px;
  font-size: 12px;
  display: flex;
`;

export const SongName = styled.div`
  max-width: 300px;
  color: #e8e8e8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
`;

export const ArtistName = styled.div`
  max-width: 220px;
  margin-left: 15px;
  color: #9b9b9b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
`;

export const WordSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 16px;
  height: 53px;
  padding: 3px 0px;
  padding-bottom: 8px;
`;

export const SliderArea = styled.div`
  width: 493px;
  position: relative;
  height: 12px;
  background: ${() => `url(${sliderImage})`};
  background-position: right 0;
  z-index: 999;
  cursor: pointer;
`;

export const CurrentSlider = styled.div`
  background: ${() => `url(${sliderImage})`};
  background-position: left -66px;
  height: 9px;
  position: absolute;
`;

export const SliderDot = styled.div`
  background: ${() => `url(${iconImage})`};
  background-position: 0 -250px;
  width: 22px;
  height: 24px;
  position: absolute;
  bottom: -4px;
  left: -6px;

  &:hover {
    background-position: 0 -280px;
  }
`;

export const BufferedSlider = styled.div`
  background: ${() => `url(${sliderImage})`};
  background-position: right -30px;
  position: absolute;
  height: 9px;
`;

export const TimeArea = styled.div`
  color: #797979;
  text-shadow: 0 1px 0 #121212;
  font-size: 12px;
  margin-top: 20px;
  width: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:first-child {
    color: #a1a1a1;
  }
`;
