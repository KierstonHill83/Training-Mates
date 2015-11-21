// app.controller('chatRoomController', ['$scope', '$location', function($scope, $location) {



//   var socket = io();

//   $('#chatForm').hide();

//   // Grab the value of the initial user name.
//   $('#socketform').submit(function() {
//     socket.emit('setName',$('#m').val());
//     $('#m').val('');
//     $('#socketform').hide();
//     return false;
//   });

//   // Grab the value of the person they want to invite.
//   $('#privateForm').submit(function() {
//       socket.emit('createRoom', $('#p').val(), $('#r').val());
//       $('#p').val('');
//       $('#r').val('');
//       $('#chatForm').show();
//       $('#privateForm').hide();
//       return false;
//   });

//   // Grab the value of the message that is being sent.
//   $('#chatForm').submit(function() {
//       socket.emit('chat message', $('#t').val());
//       $('#t').val('');
//       return false;
//   });

//   // Append the join me message link to the screen.
//   socket.on('privateChat', function(msg) {
//       $('#message').append($('<li>').html(msg));
//   });

//   // Console log the messsage
//   socket.on('private', function(msg) {
//       console.log(msg);
//   });

//   // Apped the message to the screen.
//   socket.on('chat message', function(msg) {
//     $('#message').append($('<li>').text(msg));
//   });

// }]);


app.controller('chatRoomController', function($log, $scope, chatSocket, messageFormatter, nickName) {

  $scope.nickName = nickName;
  $scope.messageLog = 'Ready to chat!';

  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      nickName = match[1];
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(), nickName, 'nickname changed - from ' + oldNick + ' to ' + nickName + '!') + $scope.messageLog;
      $scope.nickName = nickName;
    }

    $log.debug('sending message', $scope.message);
    chatSocket.emit('message', nickName, $scope.message);
    $log.debug('message sent', $scope.message);
    $scope.message = '';
  };

  $scope.$on('socket:broadcast', function(event, data) {
    $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    }
    $scope.$apply(function() {
      $scope.messageLog = messageFormatter(new Date(), data.source, data.payload) + $scope.messageLog;
    });
  });
});