const MerkelTree = require("./");

describe("#MerkelTree", () => {
  it("should throw error when no items are on tree", () => {
    expect(() => {
      new MerkelTree();
    }).toThrowError();
  });

  it("should calculate the hash with even length input", () => {
    const mt = new MerkelTree(["hello", "world", "bonjour", "salut"]);

    expect(mt.getRoot()).toEqual([
      "83a971a8dc1e2f7d8b2eb55ae659f049ff3aec1834226a88d0397246fc76dd8f",
    ]);

    expect(mt.getHeight()).toEqual(3);

    expect(mt.getAllTree()).toEqual([
      ["83a971a8dc1e2f7d8b2eb55ae659f049ff3aec1834226a88d0397246fc76dd8f"],
      [
        "15e178b71fae8849ee562c9cc0d7ea322fba6cd495411329d47234479167cc8b",
        "0f58131ba505b625415ee2ab6118e2d8c58b461bf795e6897ffd6fcb9e987c25",
      ],
      [
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
        "486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7",
        "2cb4b1431b84ec15d35ed83bb927e27e8967d75f4bcd9cc4b25c8d879ae23e18",
        "ec9c3a34e791bda21bbcb69ea0eb875857497e0d48c75771b3d1adb5073ce791",
      ],
    ]);
  });

  it("should calculate the tree with odd length input", () => {
    const mt = new MerkelTree(["mexico", "france", "italy", "uk", "USA"]);

    expect(mt.getRoot()).toEqual([
      "2ee40c8cfbbf27bf619c4eff4bc1d8d6e207d18239856eb7689c06479e1a6d5b",
    ]);
    expect(mt.getHeight()).toEqual(4);
  });

  it("should throw an error when trying to access to not existing level", () => {
    const mt = new MerkelTree(["mexico"]);

    expect(mt.getRoot()).toEqual([
      "8be2978e343799a3747a31957706009d207d6a3de7978e63f00b2a41cc99355f",
    ]);
    expect(mt.getHeight()).toEqual(1);
    expect(mt.getLevel(1000)).toEqual("level not part of tree");
  });

  it("should work the same with massive big input number", () => {
    const alotOfEntries = [...Array(300)].map((_, y) => String.fromCharCode(y));

    const mt = new MerkelTree(alotOfEntries);

    expect(mt.getRoot()).toEqual([
      "2142adf50084423ebe5e1f99284fe2cd734945a9edf89c012a88fde32fde2700",
    ]);
    expect(mt.getHeight()).toEqual(10);
  });
});
