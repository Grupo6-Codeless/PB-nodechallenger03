class PetServiceMock {
  PetUpdateRepositoryMockRequestCorrect(): any {
    return {
      name: 'Akamaru',
      species: 'dog',
      carry: 'p',
      weight: 10,
      date_of_birth: '1993-12-12 10:10',
    };
  }

  delete(): any {
    return {
      _id: '64c424c75ffde056dbe3eb95',
    };
  }

  deletePet(): any {
    return {
      _id: '64c424c75ffde056dbe3eb95',
    };
  }
}

export default new PetServiceMock();
