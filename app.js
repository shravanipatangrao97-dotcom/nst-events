document.addEventListener('DOMContentLoaded', () => {
  const cloneLoader = document.getElementById('clone-loader');
  const cloneCard = document.getElementById('clone-card');

  setTimeout(() => {
    if (cloneLoader && cloneCard) {
      cloneLoader.style.display = 'none';
      cloneCard.style.display = 'block';
    }
  }, 400);

  window.triggerGoogleAuth = function() {
    alert('Redirecting to Google SSO Auth Gateway...');
  };

  window.dismissError = function() {
    const banner = document.getElementById('clone-error-banner');
    if (banner) banner.style.display = 'none';
  };
});
