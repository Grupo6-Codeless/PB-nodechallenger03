class TutorServiceMock {
  TutorGetRepositoryMock(): any {
    return {
      docs: [
        {
          _id: '64a32d48df2eaccf95fee709',
          name: 'Tamisia',
          phone: '69981212317',
          email: 'tamisia@paidepet.com',
          date_of_birth: '1993-12-12 10:10',
          zip_code: 61760000,
          pets: [
            {
              _id: '64a34a8ff0e6d55acba1d5b8',
              name: 'Espartano Lindo',
              species: 'cat',
              carry: 'p',
              weight: 10,
              date_of_birth: '1993-12-12 10: 10',
            },
          ],
        },
      ],
      totalDocs: 11,
      limit: 10,
      totalPages: 2,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: true,
      prevPage: null,
      nextPage: 2,
    };
  }

  TutorFindTutorOfPetRepositoryMockRequestCorrect(): any {
    return {
      _id: '64a32d48df2eaccf95fee709',
      name: 'Antonio',
      phone: '69981212317',
      email: 'antonio@paidepet.com',
      date_of_birth: '1993-12-12 10:10',
      zip_code: 61760000,
      pets: [
        {
          name: 'Kon',
          species: 'dog',
          carry: 'p',
          weight: 10,
          date_of_birth: '1993-12-12 10:10',
        },
      ],
    };
  }

  post(): any {
    return {
      name: 'Guilherme',
      phone: '69981212317',
      email: 'antonio@paidepet.com',
      date_of_birth: '1993-12-12 10:10',
      zip_code: 61760000,
    };
  }
}

export default new TutorServiceMock();
