class menuConvert {
    async convert(rows) {
        let type = 0;
        let dayMenu = [];
        let rowNumber = 0;
        let unnepJelzo = 0;
        rows.forEach((row, index) => {
            if (index > 38) return;
            const keys = Object.keys(row);
            if (row.__EMPTY !== undefined) {
                type++;
            }
            switch (rowNumber) {
                case 0:
                    var y = unnepJelzo;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            if (!dayMenu[y]) dayMenu[y] = [];
                            if (row[keyName] !== "ÜNNEP" && row[keyName] !== "SZÜNET" && row[keyName] !== "Pihenőnap" && row[keyName] !== "Ünnepnap") {
                                dayMenu[y].push([type, row[keyName]])
                                y++;
                            }
                            else {
                                dayMenu[y].push(undefined)
                                unnepJelzo++;
                                y++;
                            }
                        }
                    }
                    rowNumber++;
                    break;
                case 1:
                    var y = unnepJelzo;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            let energia = row[keyName];
                            dayMenu[y][type - 1].push(energia.split(":")[1].trim())
                            y++;
                        }
                    }
                    rowNumber++;
                    break;
                case 2:
                    rowNumber++;
                    break;
                case 3:
                    var y = unnepJelzo;
                    var szamlalo = 0;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            dayMenu[y][type - 1].push(row[keyName]);
                            szamlalo++;
                        }
                        if (szamlalo === 3) {
                            y++;
                            szamlalo = 0;
                        }
                    }
                    rowNumber++;
                    break;
                case 4:
                    rowNumber++;
                    break;
                case 5:
                    var y = unnepJelzo;
                    var szamlalo = 0;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            dayMenu[y][type - 1].push(row[keyName]);
                            szamlalo++;
                        }
                        if (szamlalo === 3) {
                            y++;
                            szamlalo = 0;
                        }
                    }
                    rowNumber++;
                    break;
                case 6:
                    var y = unnepJelzo;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            dayMenu[y][type - 1].push(row[keyName]);
                            y++;
                        }
                    }
                    rowNumber = 0;
                    break;
                default:
                    console.error("Hiba a switchben");
                    break;
            }
        })
        return dayMenu;
    }
}

module.exports = new menuConvert()