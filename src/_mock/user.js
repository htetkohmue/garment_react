import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import axios from 'axios';
import { useState,useEffect} from 'react';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  codeId: sample([
    '0003',
    '0006 ',
    '0008',
    '0009',
    '0003'
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  // role: sample([
  //   'Leader',
  //   'Hr Manager',
  //   'UI Designer',
  //   'UX Designer',
  //   'UI/UX Designer',
  //   'Project Manager',
  //   'Backend Developer',
  //   'Full Stack Designer',
  //   'Front End Developer',
  //   'Full Stack Developer Htet Ko Hmue',
  // ]),
  role: sample([
    '093243423534532',
    '093243423534532',
    '0932423534532',
    '0947535775',
    '0745895868586',
    '0745895868586',
    '09475475888',
    '088586866',
    '0485848588',
    '0848757457',
  ]),
}));

export default users;
