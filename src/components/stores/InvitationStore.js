import { observable, action, computed } from 'mobx'
import { setter, intercept } from 'mobx-decorators'
import toggle from 'mobx-decorators/lib/toggle';

export default class InvitationStore {

  @setter
  @observable
  invitationCode = undefined

  @setter
  @observable
  isInvitationCodeValid = true

  @action toogleIsInvitationCodeValid() {
    
    this.setIsInvitationCodeValid(!this.isInvitationCodeValid)
    console.log(this.isInvitationCodeValid)
  }

  @setter
  @observable
  numOfAdults = undefined

  @setter
  @observable
  maxNumOfAdults = undefined

  @setter
  @observable
  numOfInfants = undefined

  @setter
  @observable
  maxNumOfInfants = undefined

  @setter
  @observable
  isEnforcedSeating = true

  @setter
  @observable
  isJoiningCeremony = undefined

  @setter
  @observable
  isJoiningDinner = undefined

  @observable
  comment = ""

  @setter
  formValues = null

  @observable
  isValidateForm = true

  isJoingDinnerButtonSelected(value) {
    return (this.isJoiningDinner === value)
  }

  isJoingCeremonyButtonSelected(value) {
    return (this.isJoiningCeremony === value)
  }


  // @computed get articles() {
  //   return this.articlesRegistry.values()
  // }
}

