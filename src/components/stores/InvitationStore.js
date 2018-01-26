import { observable, action, computed } from 'mobx';

export class InvitationStore {

  @observable numOfAdults = 0;

  // @computed get articles() {
  //   return this.articlesRegistry.values();
  // };

  @action setNumOfAdults(num) {
    this.numOfAdults = num;
  }

}

export default new InvitationStore();
