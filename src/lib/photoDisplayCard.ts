type PhotoDisplayCardOptions = {
  src: string;
  alt: string;
  showDownload?: boolean;
  downloadHref?: string;
  downloadName?: string;
  onDelete?: () => void;
  onDownloadClick?: () => void;
};

const STYLE_TAG_ID = "photo-display-card-styles";

function ensurePhotoDisplayCardStyles() {
  if (document.getElementById(STYLE_TAG_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_TAG_ID;
  style.textContent = `
    .photo-display-card {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid var(--line);
      background: var(--bg);
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(22, 31, 43, 0.08);
    }

    .photo-display-card__media {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
    }

    .photo-display-card__image {
      display: block;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .photo-display-card__actions {
      position: absolute;
      top: 0.38rem;
      right: 0.38rem;
      display: flex;
      gap: 0.38rem;
      z-index: 2;
    }

    .photo-display-card__action {
      width: 2.2rem;
      height: 2.2rem;
      min-width: 2.2rem;
      min-height: 2.2rem;
      border: 1px solid transparent !important;
      border-radius: 0 !important;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      padding: 0 !important;
      transition: filter 0.18s ease;
      box-shadow: 0 3px 8px rgba(18, 28, 40, 0.22);
    }

    .photo-display-card__action--download {
      background: #1d63c5 !important;
      border-color: #1b58ad;
    }

    .photo-display-card__action--delete {
      background: #b84848 !important;
      border-color: #9e3b3b;
    }

    .photo-display-card__action:hover {
      filter: brightness(1.08);
      transform: none;
    }

    .photo-display-card__action img {
      width: 17px;
      height: 17px;
      display: block;
      pointer-events: none;
    }
  `;

  document.head.appendChild(style);
}

function createIcon(src: string) {
  const icon = document.createElement("img");
  icon.src = src;
  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

export function createPhotoDisplayCard(options: PhotoDisplayCardOptions) {
  ensurePhotoDisplayCardStyles();

  const card = document.createElement("div");
  card.className = "photo-display-card";

  const media = document.createElement("div");
  media.className = "photo-display-card__media";

  const image = document.createElement("img");
  image.className = "photo-display-card__image";
  image.src = options.src;
  image.alt = options.alt;
  image.loading = "lazy";
  image.decoding = "async";

  media.appendChild(image);
  card.appendChild(media);

  const actions = document.createElement("div");
  actions.className = "photo-display-card__actions";

  if (options.showDownload && options.downloadHref) {
    const downloadLink = document.createElement("a");
    downloadLink.className =
      "photo-display-card__action photo-display-card__action--download";
    downloadLink.href = options.downloadHref;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    downloadLink.download = options.downloadName || "foto";
    downloadLink.title = "Descargar foto";
    downloadLink.setAttribute("aria-label", "Descargar foto");
    downloadLink.appendChild(createIcon("/download.svg"));

    if (options.onDownloadClick) {
      downloadLink.addEventListener("click", options.onDownloadClick);
    }

    actions.appendChild(downloadLink);
  }

  if (options.onDelete) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className =
      "photo-display-card__action photo-display-card__action--delete";
    deleteButton.title = "Borrar foto";
    deleteButton.setAttribute("aria-label", "Borrar foto");
    deleteButton.appendChild(createIcon("/delete.svg"));
    deleteButton.addEventListener("click", options.onDelete);
    actions.appendChild(deleteButton);
  }

  if (actions.childElementCount > 0) {
    card.appendChild(actions);
  }

  return card;
}
