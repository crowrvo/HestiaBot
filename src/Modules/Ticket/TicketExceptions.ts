function ChannelNameException(Message: string) {
  this.Message = Message
  this.code = 1
}

function CategoryIdException(Message: string) {
  this.Message = Message
  this.code = 2
}

function MemberException(Message: string) {

  this.Message = Message
  this.code = 3

}

export { CategoryIdException, ChannelNameException, MemberException }