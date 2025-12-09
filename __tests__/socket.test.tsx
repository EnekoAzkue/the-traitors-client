import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../src/helpers/interfaces/socket";
import { CURRENT_DOMAIN, SocketClientToServerEvents, SocketServerToClientEvents } from "../src/helpers/constants/constants";
import fakeUser from '../__mocks__/fakeUser.json'
import fakeUsers from '../__mocks__/fakeUsers.json'
import { userCoords } from "../__mocks__/artifactsMocks";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  CURRENT_DOMAIN,
  { autoConnect: false }
);

const acolyteHandlers = {
  setAcolytesInHall: jest.fn(),
  setNewCoords: jest.fn(),
  setAcolyetsInSwamp: jest.fn(),
};

socket.emit = jest.fn();
socket.on = jest.fn();

describe('socket', () => {

  test('search for acolytes on hall', () => {

    let acolytesInHall: any[] = []
    socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);

    expect(socket.emit).toHaveBeenCalledWith(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);

    socket.on(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL, () => {
      acolytesInHall = fakeUsers.filter(acolyte => acolyte.inHall === true);
      jest.spyOn(acolyteHandlers, 'setAcolytesInHall').mockReturnValue(acolytesInHall);
    });

    if (acolytesInHall.length > 0) {
      acolytesInHall.forEach((acolyte) => {
        expect(acolyte.inHall).toBe(true);
      });
    }
  });

  test("update acolyte's position", () => {
    let userCoordenates = { email: fakeUser.email, coords: userCoords }
    const originalCoords = { email: fakeUser.email, coords: userCoords };

    let newCoordenates = {
      latitude: 11,
      longitude: 11,
      altitude: null,
      accuracy: 5,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    };

    socket.on = jest.fn();
    socket.emit = jest.fn();

    socket.emit(
      SocketClientToServerEvents.SEND_ACOLYTES_COORDS,
      userCoordenates
    );

    expect(socket.emit).toHaveBeenCalledWith(SocketClientToServerEvents.SEND_ACOLYTES_COORDS, userCoordenates);

    socket.on(SocketServerToClientEvents.GET_ACOLYTE_NEW_COORDS, () => {
      userCoordenates = { ...fakeUser, coords: newCoordenates };
    });

    const callback = (socket.on as jest.Mock).mock.calls[0][1];
    callback(newCoordenates);

    expect(userCoordenates).not.toEqual(originalCoords);
  });

  test('search for acolytes in swamp', () => {

    let acolytesInSwamp: any[] = []
    socket.emit(SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES);

    expect(socket.emit).toHaveBeenCalledWith(SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES);

    socket.on(SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES, () => {
      acolytesInSwamp = fakeUsers.filter(acolyte => acolyte.inSwamp === true);
      jest.spyOn(acolyteHandlers, 'setAcolyetsInSwamp').mockReturnValue(acolytesInSwamp);
    });

    if (acolytesInSwamp.length > 0) {
      acolytesInSwamp.forEach((acolyte) => {
        expect(acolyte.inSwamp).toBe(true);
      });
    }
  });

});
