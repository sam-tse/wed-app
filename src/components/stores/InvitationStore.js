import { observable, action, computed } from 'mobx'
import { setter, intercept } from 'mobx-decorators'

export class InvitationStore {

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
  isJoiningReception = undefined

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
    return (this.isJoiningDinner===true && value === 'Yes') || (this.isJoiningDinner===false && value === 'No')
  }

  // @computed get articles() {
  //   return this.articlesRegistry.values()
  // }
}

export default new InvitationStore()
