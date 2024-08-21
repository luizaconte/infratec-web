import {v4 as uuidv4} from 'uuid';

export class ObjectState {
  _KEY_: string;
  object_state: string;

  constructor() {
    this._KEY_ = uuidv4();
  }
}

export class ObjectStateInt {
  _KEY_: string;
  objectState: string;

  constructor() {
    this._KEY_ = uuidv4();
  }
}
