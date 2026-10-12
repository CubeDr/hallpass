document.addEventListener('DOMContentLoaded', () => {
  const fields = [
    { inputId: 'input-provider', viewId: 'view-provider' },
    { inputId: 'input-member', viewId: 'view-member' },
    { inputId: 'input-cost', viewId: 'view-cost' },
    { inputId: 'input-service', viewId: 'view-service' },
    { inputId: 'input-payment', viewId: 'view-payment' },
    { inputId: 'input-etc-text', viewId: 'view-etc-text' },
  ];

  const syncAll = () => {
    fields.forEach(({ inputId, viewId }) => {
      const inputEl = document.getElementById(inputId);
      const viewEl = document.getElementById(viewId);
      viewEl.textContent = inputEl.value;
    });
  };

  fields.forEach(({ inputId, viewId }) => {
    const inputEl = document.getElementById(inputId);
    const viewEl = document.getElementById(viewId);

    inputEl.addEventListener('input', () => {
      viewEl.textContent = inputEl.value;
    });
  });

  const templates = {
    'btn-tpl-reboot': {
      'input-provider': '리부트배드민턴센터&샵 (안진욱)',
      'input-member': '김현이 (Hyuni Kim)',
      'input-cost': '200,000원',
      'input-service': '10월 아카데미 레슨',
      'input-payment': '계좌이체 (완료: 2026/09/25 23:00)',
      'input-etc-text': '진행 일자: 5일, 12일, 19일, 26일\n레슨 시간: 오후 9:00 ~ 오후 10:30\n담당 코치: 윤재원, 김동현, 이상무',
    },
    'btn-tpl-kim': {
      'input-provider': '김동탁',
      'input-member': '김현이 (Hyuni Kim)',
      'input-cost': '250,000원',
      'input-service': '10월 김조교 토요 클래스',
      'input-payment': '계좌이체 (완료: 2026/09/25 23:00)',
      'input-etc-text': '일자: 9월 27일, 10월 3일, 10일, 24일\n시간: 오후 3:30 ~ 오후 5:00\n담당 코치: 김동탁',
    },
  };

  Object.entries(templates).forEach(([btnId, tplData]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      Object.entries(tplData).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
      });
      syncAll();
    });
  });

  const imageInput = document.getElementById('input-etc-image');
  const imagesContainer = document.getElementById('view-etc-images');
  const clearImagesBtn = document.getElementById('btn-clear-images');
  const printBtn = document.getElementById('btn-print');

  imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = '첨부 이미지';
        imagesContainer.appendChild(img);
        clearImagesBtn.style.display = 'inline-block';
      };
      reader.readAsDataURL(file);
    });
  });

  clearImagesBtn.addEventListener('click', () => {
    imagesContainer.innerHTML = '';
    imageInput.value = '';
    clearImagesBtn.style.display = 'none';
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });
});
