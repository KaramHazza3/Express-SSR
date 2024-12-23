window.onload = function() {

  const votesContainer = document.getElementById('votesContainer');
  const pollOptions = JSON.parse(votesContainer.dataset.options);

  var canvas = document.getElementById('pieChart');
  var ctx = canvas.getContext('2d');

  const filteredOptions = pollOptions.filter(option => option.no_votes > 0);

  const labels = filteredOptions.map(option => option.text);
  const voteCounts = filteredOptions.map(option => option.no_votes);
  const colors = ['#FF6384', '#FFCE56', '#36A2EB', '#4BC0C0'];

  if (filteredOptions.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#000';
      ctx.font = '25px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No votes available', canvas.width / 2, canvas.height / 2);
  } else {
      function drawPieChart(ctx, voteCounts, labels, colors) {
          var totalVotes = voteCounts.reduce((a, b) => a + b, 0);
          var startAngle = 0;

          voteCounts.forEach((vote, index) => {
              var sliceAngle = (vote / totalVotes) * 2 * Math.PI;

              ctx.beginPath();
              ctx.moveTo(200, 200);
              ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
              ctx.fillStyle = colors[index % colors.length];
              ctx.fill();

              var labelAngle = startAngle + sliceAngle / 2;
              var labelX = 200 + Math.cos(labelAngle) * 100; 
              var labelY = 200 + Math.sin(labelAngle) * 100;

              ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
              ctx.shadowBlur = 4;
              ctx.shadowOffsetX = 2;
              ctx.shadowOffsetY = 2;

              ctx.fillStyle = '#fff';
              ctx.font = '18px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(labels[index], labelX, labelY);

              ctx.shadowColor = 'transparent';

              startAngle += sliceAngle;
          });
      }

      drawPieChart(ctx, voteCounts, labels, colors);
  }
}
