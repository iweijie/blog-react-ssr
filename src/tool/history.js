import { createBrowserHistory, createMemoryHistory } from 'history';
import isServer from "./env"

let history;
if (!isServer) {
  history = createBrowserHistory()
} else {
  history = createMemoryHistory({
    initialEntries: ["/"]
  })
}

export default history;