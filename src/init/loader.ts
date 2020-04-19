const ID = "loading-app";

export const injectLoader = () => {
  const style = `
  #loading-app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  
  .spinner {
    animation: rotation 1.5s linear infinite;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
  .path {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes dash {
    0% {
      stroke-dashoffset: 187;
    }
    50% {
      stroke-dashoffset: 46.75;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 187;
      transform: rotate(450deg);
    }
  }`;

  const html = `
  <div id="${ID}">
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke="#03A9F4" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
  `;

  const styleElement = document.createElement('style');
  styleElement.innerText = style;

  document.head.appendChild(styleElement);
  document.body.insertAdjacentHTML('afterbegin', html);
};

export const removeLoader = () => {
  document.getElementById(ID)?.remove()
};
