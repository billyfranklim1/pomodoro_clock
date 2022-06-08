if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/src/js/sw.js').then(function(registration) {
    console.log('SW registration succeeded');
  }).catch(function(e) {
    console.log('SW registration failed with error:', e);
  });
}