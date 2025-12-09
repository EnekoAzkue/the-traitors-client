import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../src/helpers/interfaces/socket";
import { CURRENT_DOMAIN, SocketClientToServerEvents, SocketServerToClientEvents } from "../src/helpers/constants/constants";
import fakeUser from '../__mocks__/fakeUser.json'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  CURRENT_DOMAIN,
  { autoConnect: false }
);

const acolyteHandlers = {
  setAcolytesInHall: jest.fn(),
};


socket.emit = jest.fn();
socket.on = jest.fn();

describe('socket', () => {

  test('search for acolytes on hall (false case)', () => {

    const spy = jest.spyOn(acolyteHandlers, 'setAcolytesInHall')
    spy.mockReturnValue(fakeUser)

    const acolytesInHall = fakeUser;

    const callback = socket.on.mock.calls.find(
      call => call[0] === SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL
    )?.[1];

    // Ahora ejecutas el callback con un array simulado
    callback(acolytesInHall);

    // Assertions
    expect(spy).toHaveBeenCalledWith(acolytesInHall);

    if (acolytesInHall.length > 0) {
      acolytesInHall.forEach((acolyte) => {
        expect(acolyte.inHall).not.toBe(true);
      });
    }
  });
});
