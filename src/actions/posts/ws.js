
export const Sockets = {
  socket: null,

  init: function(socket){
    this.socket = socket
  },

  emit: function(event, payload){
    this.socket.emit(event, payload)
  },

  listenEvents: function(socket){
    socket.on('like-success', data => {
      alert('liked');
    });
    
    socket.on('like-err', err => {
      alert('err');
    })
    
    socket.on('save-success', data => {
      alert('saved');
    });
    
    socket.on('save-err', err => {
      alert('err');
    })
  }
}