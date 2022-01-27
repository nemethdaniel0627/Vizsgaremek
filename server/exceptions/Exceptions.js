module.exports.exception = function (req, res, next) {

    res.badRequest = function () {
        return res.status(401).json({message: "Nincs ilyen művelet"});
    }

    res.unauthorized = function () {
        return res.status(401).json({message: "Nincs jogosultsága erre a műveletre!"});
    }

    res.forbidden = function () {
        return res.status(403).json({message: "Megtiltott művelet!"});
    }

    res.notFound = function () {
        return res.status(404).json({message: "Nincs olyan elem, amit keres"});
    }

    res.methodNotAllowed = function () {
        return res.status(405).json({message: "Nem engedélyezett művelet"});
    }

    res.notAccaptable = function () {
        return res.status(406).json({message: "Rossz formátumú adat"});
    }

    res.conflict = function () {
        return res.status(409).json({message: "Ütközés történt a szerveren lévő adatokkal"});
    }
    next();
}