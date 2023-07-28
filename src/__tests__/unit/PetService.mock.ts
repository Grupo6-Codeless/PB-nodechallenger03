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
    return undefined;
  }
}

export default new PetServiceMock();
