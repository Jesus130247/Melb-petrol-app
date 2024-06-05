export default function findIconUrl(brand) {
    let icons  = {
      "Caltex": "https://fuelprice.io/wp-content/uploads/2018/07/caltex-favicon-64x64.png",
      "BP": "https://fuelprice.io/wp-content/uploads/2018/07/bp-favicon.png",
      "Shell": "https://fuelprice.io/wp-content/uploads/2018/07/shell-favicon.png",
      "7-Eleven": "https://fuelprice.io/wp-content/uploads/2018/07/7-eleven-64x62.png",
      "default": "https://fuelprice.io/wp-content/uploads/2018/10/fuelprice-logo.png"
    }
    if (icons[brand]) {
      return icons[brand]
    } else {
      return icons.default
    }
  }