export const ROOM = 'ROOM';

export function setRoom(room) {
  return {
    type: ROOM,
    room: room
  };
}
