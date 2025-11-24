# Copyright (C) 2025 DuckAfire <https://duckafire.gitlab.io>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

FROM node:18.20.8-alpine3.21

WORKDIR nest
EXPOSE 8080
CMD ["npm", "run", "deploy"]

COPY nodejs/package.json .
RUN npm install

COPY .github/404.html .
COPY nodejs .

COPY ./src ./public
RUN npm run build
